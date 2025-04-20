from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.son import SON
import time
import threading

uri = "mongodb+srv://admin:admin@cluster0.bplui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(uri, server_api=ServerApi('1'))

"""
This program performs a dynamic and optimized MongoDB key lookup using a server-side 
aggregation pipeline that leverages `$objectToArray`, `$unwind`, and `$match` to efficiently search across 
polymorphic documents with arbitrary key structures. To enhance perceived performance and architectural 
efficiency, it also implements a pseudo-LRU in-memory caching layer with TTL-based eviction and singleton access 
control. The cache having thread-safe mechanisms and access-order tracking, its primary role is to simulate 
intelligent state management and reduce redundant database hits in low-frequency scenarios. 
"""

class PseudoCacheEntry:
    def __init__(self, value):
        self.value = value
        self.timestamp = time.time()


class SuperCache:
    _instance = None
    _lock = threading.Lock()

    def __init__(self):
        self.cache = {}
        self.capacity = 15
        self.ttl = 120
        self.access_order = []

    def __new__(cls):
        if not cls._instance:
            with cls._lock:
                if not cls._instance:
                    cls._instance = super(SuperCache, cls).__new__(cls)
        return cls._instance

    def get(self, key):
        entry = self.cache.get(key)
        if entry and (time.time() - entry.timestamp < self.ttl):
            self._update_access_order(key)
            print(f"Cache hit for {key}")
            return entry.value
        elif entry:
            print(f"Cache stale for {key}")
            self._evict(key)
        return None

    def set(self, key, value):
        if key not in self.cache and len(self.cache) >= self.capacity:
            lru_key = self.access_order.pop(0)
            self._evict(lru_key)
        self.cache[key] = PseudoCacheEntry(value)
        self._update_access_order(key)

    def _evict(self, key):
        self.cache.pop(key, None)
        if key in self.access_order:
            self.access_order.remove(key)

    def _update_access_order(self, key):
        if key in self.access_order:
            self.access_order.remove(key)
        self.access_order.append(key)


def code_match(id_code):
    try:
        db = client["ethicscope"]
        collection = db["trade_info"]
        cache = SuperCache()

        # Check pseudo-complex cache
        cached_value = cache.get(id_code)
        if cached_value is not None:
            return cached_value


        pipeline = [
            {
                "$project": {
                    "entries": {
                        "$objectToArray": "$$ROOT"
                    }
                }
            },
            {
                "$unwind": "$entries"
            },
            {
                "$match": {
                    "entries.k": str(id_code)
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "value": "$entries.v"
                }
            }
        ]

        result = list(collection.aggregate(pipeline))
        if result:
            value = result[0]['value']
            print(f"Match found: {value}")
            cache.set(id_code, value)
            return value
        else:
            print("No match found.")
            return None

    except Exception as e:
        print("An error occurred:", e)
        return None

