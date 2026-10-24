class Solution:
    def smallestSubsequence(self, s: str) -> str:
        last = {c: i for i, c in enumerate(s)}
        stack = []
        seen = set()
        for i, c in enumerate(s):
            if c not in seen:
                while stack and stack[-1] > c and last[stack[-1]] > i:
                    seen.remove(stack.pop())
                stack.append(c)
                seen.add(c)
        return "".join(stack)

def test():
    sol = Solution()
    assert sol.smallestSubsequence("bcabc") == "abc", "test 1 failed"
    assert sol.smallestSubsequence("cbacdcbc") == "acdb", "test 2 failed"
    print("✓ smallest-subsequence-of-distinct-characters passed")

if __name__ == "__main__":
    test()
