class Solution:
    def getHappyString(self, n: int, k: int) -> str:
        total = 3 * (1 << (n - 1))
        if k > total:
            return ""
        k -= 1
        first_char_idx = k // (1 << (n - 1))
        res = [["a", "b", "c"][first_char_idx]]
        k %= (1 << (n - 1))
        for i in range(1, n):
            options = [c for c in ["a", "b", "c"] if c != res[-1]]
            branch_size = 1 << (n - 1 - i)
            choice = k // branch_size
            res.append(options[choice])
            k %= branch_size
        return "".join(res)

def test():
    sol = Solution()
    assert sol.getHappyString(1, 3) == "c", "test 1 failed"
    assert sol.getHappyString(1, 4) == "", "test 2 failed"
    assert sol.getHappyString(3, 9) == "cab", "test 3 failed"
    print("✓ the-k-th-lexicographical-string-of-all-happy-strings-of-length-n passed")

if __name__ == "__main__":
    test()
