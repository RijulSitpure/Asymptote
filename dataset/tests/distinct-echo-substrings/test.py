class Solution:
    def distinctEchoSubstrings(self, text: str) -> int:
        n = len(text)
        res = set()
        for length in range(1, n // 2 + 1):
            for i in range(n - 2 * length + 1):
                first = text[i:i + length]
                second = text[i + length:i + 2 * length]
                if first == second:
                    res.add(first)
        return len(res)

def test():
    sol = Solution()
    assert sol.distinctEchoSubstrings("abcabcabc") == 3, "test 1 failed"
    assert sol.distinctEchoSubstrings("leetcodeleetcode") == 2, "test 2 failed"
    print("✓ distinct-echo-substrings passed")

if __name__ == "__main__":
    test()
