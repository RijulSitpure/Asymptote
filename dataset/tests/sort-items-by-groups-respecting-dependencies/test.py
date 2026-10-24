from collections import defaultdict, deque

class Solution:
    def sortItems(self, n: int, m: int, group: list[int], beforeItems: list[list[int]]) -> list[int]:
        for i in range(n):
            if group[i] == -1:
                group[i] = m
                m += 1
                
        item_graph = defaultdict(list)
        item_indegree = [0] * n
        group_graph = defaultdict(list)
        group_indegree = [0] * m
        
        for curr, prevs in enumerate(beforeItems):
            for prev in prevs:
                item_graph[prev].append(curr)
                item_indegree[curr] += 1
                if group[prev] != group[curr]:
                    group_graph[group[prev]].append(group[curr])
                    group_indegree[group[curr]] += 1
                    
        def topo_sort(graph, indegree, count):
            q = deque([node for node in range(count) if indegree[node] == 0])
            res = []
            while q:
                node = q.popleft()
                res.append(node)
                for neighbor in graph[node]:
                    indegree[neighbor] -= 1
                    if indegree[neighbor] == 0:
                        q.append(neighbor)
            return res if len(res) == count else []
            
        item_order = topo_sort(item_graph, item_indegree, n)
        group_order = topo_sort(group_graph, group_indegree, m)
        
        if not item_order or not group_order:
            return []
            
        grouped_items = defaultdict(list)
        for item in item_order:
            grouped_items[group[item]].append(item)
            
        ans = []
        for grp in group_order:
            ans.extend(grouped_items[grp])
        return ans

def test():
    sol = Solution()
    res1 = sol.sortItems(8, 2, [-1, -1, 1, 0, 0, 1, 0, -1], [[], [6], [5], [6], [3, 6], [], [], []])
    assert len(res1) == 8, f"expected length 8, got {len(res1)}"
    res2 = sol.sortItems(8, 2, [-1, -1, 1, 0, 0, 1, 0, -1], [[], [6], [5], [6], [3], [], [4], []])
    assert res2 == [], f"expected cycle detection empty, got {res2}"
    print("✓ sort-items-by-groups-respecting-dependencies passed")

if __name__ == "__main__":
    test()
