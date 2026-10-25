class Solution:
    def maximizeXor(self, nums: list[int], queries: list[list[int]]) -> list[int]:
        nums.sort()
        sorted_q = sorted(enumerate(queries), key=lambda x: x[1][1])
        trie = {}

        def insert(val: int) -> None:
            node = trie
            for i in range(30, -1, -1):
                b = (val >> i) & 1
                if b not in node:
                    node[b] = {}
                node = node[b]

        def query_max(val: int) -> int:
            if not trie:
                return -1
            node = trie
            res = 0
            for i in range(30, -1, -1):
                b = (val >> i) & 1
                opp = 1 - b
                if opp in node:
                    res |= (1 << i)
                    node = node[opp]
                else:
                    node = node[b]
            return res

        ans = [-1] * len(queries)
        idx = 0
        n = len(nums)
        for orig_idx, (x, m) in sorted_q:
            while idx < n and nums[idx] <= m:
                insert(nums[idx])
                idx += 1
            ans[orig_idx] = query_max(x)
        return ans

def test():
    sol = Solution()
    assert sol.maximizeXor([0,1,2,3,4], [[3,1],[1,3],[5,6]]) == [3,3,7]
    assert sol.maximizeXor([5,2,4,6,6,3], [[12,4],[8,1],[6,3]]) == [15,-1,5]

    print("✓ maximum-xor-with-an-element-from-array passed")

if __name__ == '__main__':
    test()
