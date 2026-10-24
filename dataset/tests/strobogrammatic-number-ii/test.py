import sys

class Solution:
    def findStrobogrammatic(self, n: int) -> list:
        def helper(m: int, total: int):
            if m == 0:
                return [""]
            if m == 1:
                return ["0", "1", "8"]
            prev = helper(m - 2, total)
            res = []
            for p in prev:
                if m != total:
                    res.append("0" + p + "0")
                res.append("1" + p + "1")
                res.append("6" + p + "9")
                res.append("8" + p + "8")
                res.append("9" + p + "6")
            return res

        return helper(n, n)

def test():
    sol = Solution()
    res2 = sorted(sol.findStrobogrammatic(2))
    assert res2 == ["11", "69", "88", "96"], "test 1 failed"
    res1 = sorted(sol.findStrobogrammatic(1))
    assert res1 == ["0", "1", "8"], "test 2 failed"
    print("✓ strobogrammatic-number-ii passed")

if __name__ == "__main__":
    test()
