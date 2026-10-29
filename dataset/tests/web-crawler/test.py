class MockParser:
    def __init__(self, mapping):
        self.mapping = mapping
    def getUrls(self, url):
        return self.mapping.get(url, [])

from collections import deque

class Solution:
    def crawl(self, startUrl: str, htmlParser) -> list[str]:
        hostname = startUrl.split("/")[2]
        visited = {startUrl}
        q = deque([startUrl])

        while q:
            curr = q.popleft()
            for url in htmlParser.getUrls(curr):
                if url.split("/")[2] == hostname and url not in visited:
                    visited.add(url)
                    q.append(url)
        return sorted(list(visited))

sol = Solution()
mp = MockParser({
    "http://news.yahoo.com": ["http://news.yahoo.com/news", "http://news.yahoo.com/us"],
    "http://news.yahoo.com/news": ["http://news.google.com"],
    "http://news.yahoo.com/us": []
})
assert sol.crawl("http://news.yahoo.com", mp) == [
    "http://news.yahoo.com",
    "http://news.yahoo.com/news",
    "http://news.yahoo.com/us"
]
print("All tests passed successfully.")
