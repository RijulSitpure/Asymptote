from collections import defaultdict

class Solution:
    def minimumHammingDistance(self, source: list[int], target: list[int], allowedSwaps: list[list[int]]) -> int:
        n = len(source)
        parent = list(range(n))

        def find(x: int) -> int:
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(x: int, y: int) -> None:
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry

        for u, v in allowedSwaps:
            union(u, v)

        components = defaultdict(list)
        for i in range(n):
            components[find(i)].append(i)

        diff = 0
        for comp in components.values():
            freq = defaultdict(int)
            for idx in comp:
                freq[source[idx]] += 1
            for idx in comp:
                val = target[idx]
                if freq[val] > 0:
                    freq[val] -= 1
                else:
                    diff += 1
        return diff

def test():
    sol = Solution()
    assert sol.minimumHammingDistance([1,2,3,4], [2,1,4,5], [[0,1],[2,3]]) == 1
    assert sol.minimumHammingDistance([1,2,3,4], [1,3,2,4], []) == 2
    assert sol.minimumHammingDistance([5,1,2,4,3], [1,5,4,2,3], [[0,4],[4,2],[1,3],[1,4]]) == 0

    print("✓ minimize-hamming-distance-after-swap-operations passed")

if __name__ == '__main__':
    test()
