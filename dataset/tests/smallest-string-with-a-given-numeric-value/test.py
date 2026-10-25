class Solution:
    def getSmallestString(self, n: int, k: int) -> str:
        res = ["a"] * n
        rem = k - n
        i = n - 1
        while rem > 0:
            add = min(25, rem)
            res[i] = chr(ord("a") + add)
            rem -= add
            i -= 1
        return "".join(res)

def test():
    sol = Solution()
    assert sol.getSmallestString(3, 27) == "aay"
    assert sol.getSmallestString(5, 73) == "aaszz"

    print("✓ smallest-string-with-a-given-numeric-value passed")

if __name__ == '__main__':
    test()
