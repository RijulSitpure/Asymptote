import sys
from typing import List
from collections import defaultdict

class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        adj = defaultdict(list)
        for u, v in sorted(tickets, reverse=True):
            adj[u].append(v)

        route = []
        def dfs(airport: str):
            while adj[airport]:
                nxt = adj[airport].pop()
                dfs(nxt)
            route.append(airport)

        dfs("JFK")
        return route[::-1]

def test():
    sol = Solution()
    t1 = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
    assert sol.findItinerary(t1) == ["JFK","MUC","LHR","SFO","SJC"], "test 1 failed"
    t2 = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
    assert sol.findItinerary(t2) == ["JFK","ATL","JFK","SFO","ATL","SFO"], "test 2 failed"
    print("✓ reconstruct-itinerary passed")

if __name__ == "__main__":
    test()
