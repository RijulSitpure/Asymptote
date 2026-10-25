class Solution:
    def countQuadruples(self, firstString: str, secondString: str) -> int:
        first = {}
        for i, c in enumerate(firstString):
            if c not in first:
                first[c] = i

        last = {}
        for j, c in enumerate(secondString):
            last[c] = j

        min_diff = float('inf')
        ans = 0
        for c in first:
            if c in last:
                diff = first[c] - last[c]
                if diff < min_diff:
                    min_diff = diff
                    ans = 1
                elif diff == min_diff:
                    ans += 1
        return ans

def test():
    sol = Solution()
    assert sol.countQuadruples("abcd", "bccda") == 1
    assert sol.countQuadruples("ab", "cd") == 0

    print("✓ count-pairs-of-equal-substrings-with-minimum-difference passed")

if __name__ == '__main__':
    test()
