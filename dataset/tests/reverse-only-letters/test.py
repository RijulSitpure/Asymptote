class Solution:
    def reverseOnlyLetters(self, s: str) -> str:
        arr = list(s)
        lo, hi = 0, len(arr) - 1
        while lo < hi:
            if not arr[lo].isalpha():
                lo += 1
            elif not arr[hi].isalpha():
                hi -= 1
            else:
                arr[lo], arr[hi] = arr[hi], arr[lo]
                lo += 1
                hi -= 1
        return "".join(arr)

def test():
    sol = Solution()
    assert sol.reverseOnlyLetters("ab-cd") == "dc-ba", "test 1 failed"
    assert sol.reverseOnlyLetters("a-bC-dEf-ghIj") == "j-Ih-gfE-dCba", "test 2 failed"
    assert sol.reverseOnlyLetters("Test1ng-Leet=code-Q!") == "Qedo1ct-eeLg=ntse-T!", "test 3 failed"
    print("✓ reverse-only-letters passed")

if __name__ == "__main__":
    test()
