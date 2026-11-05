class Solution:
    def reversePrefix(self, word: str, ch: str) -> str:
        idx = word.find(ch)
        if idx == -1:
            return word
        return word[:idx + 1][::-1] + word[idx + 1:]

def run_tests():
    sol = Solution()
    assert sol.reversePrefix("abcdefd", "d") == "dcbaefd"
    assert sol.reversePrefix("xyxzxe", "z") == "zxyxxe"
    assert sol.reversePrefix("abcd", "z") == "abcd"
    print("All tests passed for 3794.")

if __name__ == "__main__":
    run_tests()
