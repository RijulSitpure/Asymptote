class Solution:
    def maximumGain(self, s: str, x: int, y: int) -> int:
        if x >= y:
            first_pair, first_val = "ab", x
            second_pair, second_val = "ba", y
        else:
            first_pair, first_val = "ba", y
            second_pair, second_val = "ab", x

        ans = 0
        stack1 = []
        for c in s:
            if stack1 and stack1[-1] == first_pair[0] and c == first_pair[1]:
                stack1.pop()
                ans += first_val
            else:
                stack1.append(c)

        stack2 = []
        for c in stack1:
            if stack2 and stack2[-1] == second_pair[0] and c == second_pair[1]:
                stack2.pop()
                ans += second_val
            else:
                stack2.append(c)

        return ans

def test():
    sol = Solution()
    assert sol.maximumGain("cdbcbbaaabab", 4, 5) == 19
    assert sol.maximumGain("aabbaaxybbaabb", 5, 4) == 20

    print("✓ maximum-score-from-removing-substrings passed")

if __name__ == '__main__':
    test()
