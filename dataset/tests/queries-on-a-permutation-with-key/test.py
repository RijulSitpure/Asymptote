class Solution:
    def processQueries(self, queries: list[int], m: int) -> list[int]:
        p = list(range(1, m + 1))
        res = []
        for q in queries:
            idx = p.index(q)
            res.append(idx)
            p.pop(idx)
            p.insert(0, q)
        return res

def test():
    sol = Solution()
    assert sol.processQueries([3,1,2,1], 5) == [2,1,2,1], "test 1 failed"
    assert sol.processQueries([4,1,2,2], 4) == [3,1,2,0], "test 2 failed"
    assert sol.processQueries([7,5,5,8,3], 8) == [6,5,0,7,5], "test 3 failed"
    print("✓ queries-on-a-permutation-with-key passed")

if __name__ == "__main__":
    test()
