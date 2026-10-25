class Solution:
    def maxRepeating(self, sequence: str, word: str) -> int:
        k = 0
        while word * (k + 1) in sequence:
            k += 1
        return k

def test():
    sol = Solution()
    assert sol.maxRepeating("ababc", "ab") == 2
    assert sol.maxRepeating("ababc", "ba") == 1
    assert sol.maxRepeating("ababc", "ac") == 0

    print("✓ maximum-repeating-substring passed")

if __name__ == '__main__':
    test()
