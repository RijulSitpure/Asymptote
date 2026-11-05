class Solution:
    def minLengthAfterRemovals(self, s: str) -> int:
        # Repeatedly remove adjacent distinct pairs (e.g. '01' or '10')
        # Equivalent to cancelling opposite characters via a stack
        stack = []
        for c in s:
            if stack and stack[-1] != c:
                stack.pop()
            else:
                stack.append(c)
        return len(stack)

def run_tests():
    sol = Solution()
    assert sol.minLengthAfterRemovals("0101") == 0
    assert sol.minLengthAfterRemovals("0001") == 2 # 00 remains
    assert sol.minLengthAfterRemovals("1111") == 4
    print("All tests passed for 3746.")

if __name__ == "__main__":
    run_tests()