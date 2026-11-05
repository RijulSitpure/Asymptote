class Solution:
    def nextPalindromicPermutation(self, s: str) -> str:
        # s is a palindrome string
        # Find next permutation of first half, then reflect
        n = len(s)
        half = list(s[:n // 2])
        # Next permutation on half
        i = len(half) - 2
        while i >= 0 and half[i] >= half[i + 1]:
            i -= 1
        if i < 0:
            return "" # no greater permutation exists
        j = len(half) - 1
        while half[j] <= half[i]:
            j -= 1
        half[i], half[j] = half[j], half[i]
        half[i + 1:] = reversed(half[i + 1:])
        
        mid = s[n // 2] if n % 2 == 1 else ""
        return "".join(half) + mid + "".join(reversed(half))

def run_tests():
    sol = Solution()
    assert sol.nextPalindromicPermutation("1221") == "2112"
    assert sol.nextPalindromicPermutation("12321") == "21312"
    assert sol.nextPalindromicPermutation("32123") == "" # descending half -> no greater
    print("All tests passed for 3734.")

if __name__ == "__main__":
    run_tests()