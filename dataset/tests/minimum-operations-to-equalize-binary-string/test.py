class Solution:
    def minOperations(self, s: str) -> int:
        blocks_0 = 0
        blocks_1 = 0
        n = len(s)
        i = 0
        while i < n:
            ch = s[i]
            if ch == '0':
                blocks_0 += 1
            else:
                blocks_1 += 1
            while i < n and s[i] == ch:
                i += 1
        return min(blocks_0, blocks_1)

def run_tests():
    sol = Solution()
    assert sol.minOperations("010") == 1
    assert sol.minOperations("0000") == 0
    assert sol.minOperations("010101") == 3
    print("All tests passed for 3666.")

if __name__ == "__main__":
    run_tests()
