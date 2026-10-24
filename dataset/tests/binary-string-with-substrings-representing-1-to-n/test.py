class Solution:
    def queryString(self, s: str, n: int) -> bool:
        if n > 2000:
            return False
        for x in range(n, n // 2, -1):
            if bin(x)[2:] not in s:
                return False
        return True

def test():
    sol = Solution()
    assert sol.queryString("0110", 3) == True, "test 1 failed"
    assert sol.queryString("0110", 4) == False, "test 2 failed"
    print("✓ binary-string-with-substrings-representing-1-to-n passed")

if __name__ == "__main__":
    test()
