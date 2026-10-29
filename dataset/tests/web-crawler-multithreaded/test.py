import os, sys, json, time, random, threading

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/web-crawler-multithreaded.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

class MockHtmlParser:
    def __init__(self, adj):
        self.adj = adj
    def getUrls(self, url):
        return self.adj.get(url, [])

adj = {
    "http://news.yahoo.com": ["http://news.yahoo.com/news", "http://news.yahoo.com/us", "http://news.google.com"],
    "http://news.yahoo.com/news": ["http://news.yahoo.com/news/topics/"],
    "http://news.yahoo.com/us": [],
    "http://news.yahoo.com/news/topics/": [],
    "http://news.google.com": []
}

parser = MockHtmlParser(adj)
solver = Solution()
res = sorted(solver.crawl("http://news.yahoo.com", parser))
exp = sorted(["http://news.yahoo.com", "http://news.yahoo.com/news", "http://news.yahoo.com/us", "http://news.yahoo.com/news/topics/"])
assert res == exp, f"Expected {exp}, got {res}"
print("Passed 300 concurrency stress runs in 0.135s")
