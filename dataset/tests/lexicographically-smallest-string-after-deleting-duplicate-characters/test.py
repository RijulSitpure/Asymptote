class Solution:
    def removeDuplicateLetters(self, s: str) -> str:
        last_occ = {c: i for i, c in enumerate(s)}
        stack = []
        seen = set()
        
        for i, c in enumerate(s):
            if c not in seen:
                while stack and stack[-1] > c and last_occ[stack[-1]] > i:
                    seen.remove(stack.pop())
                seen.add(c)
                stack.append(c)
        return "".join(stack)

def run_tests():
    sol = Solution()
    assert sol.removeDuplicateLetters("bcabc") == "abc"
    assert sol.removeDuplicateLetters("cbacdcbc") == "acdb"
    print("All tests passed for 3816.")

if __name__ == "__main__":
    run_tests()
