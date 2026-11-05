class Solution:
    def removeKBalancedSubstrings(self, s: str, k: int) -> str:
        # A k-balanced substring is k consecutive '0's followed by k consecutive '1's
        stack = [] # each element is [char, count]
        for c in s:
            if stack and stack[-1][0] == c:
                stack[-1][1] += 1
            else:
                stack.append([c, 1])
            # Check if top two blocks form k zeros and k ones
            if len(stack) >= 2 and stack[-2][0] == '0' and stack[-1][0] == '1':
                if stack[-2][1] >= k and stack[-1][1] >= k:
                    stack[-2][1] -= k
                    stack[-1][1] -= k
                    if stack[-1][1] == 0:
                        stack.pop()
                    if len(stack) >= 1 and stack[-1][1] == 0:
                        stack.pop()
                    # Merge if top elements now match
                    if len(stack) >= 2 and stack[-1][0] == stack[-2][0]:
                        stack[-2][1] += stack[-1][1]
                        stack.pop()
        res = []
        for ch, cnt in stack:
            res.append(ch * cnt)
        return "".join(res)

def run_tests():
    sol = Solution()
    assert sol.removeKBalancedSubstrings("0011", 2) == ""
    assert sol.removeKBalancedSubstrings("000111", 2) == "01" # 0011 removed from center -> 01 remains
    assert sol.removeKBalancedSubstrings("1010", 1) == "10" # 01 removed -> 10 remains
    print("All tests passed for 3703.")

if __name__ == "__main__":
    run_tests()