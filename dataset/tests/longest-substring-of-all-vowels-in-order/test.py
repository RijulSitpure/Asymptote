class Solution:
    def longestBeautifulSubstring(self, word: str) -> int:
        ans = 0
        curr_len = 1
        vowel_count = 1

        for i in range(1, len(word)):
            if word[i] >= word[i - 1]:
                curr_len += 1
                if word[i] > word[i - 1]:
                    vowel_count += 1
            else:
                curr_len = 1
                vowel_count = 1

            if vowel_count == 5:
                ans = max(ans, curr_len)

        return ans

def test():
    sol = Solution()
    assert sol.longestBeautifulSubstring("aeiaaioaaaaeiiiiouuuooaauuaeiu") == 13
    assert sol.longestBeautifulSubstring("aeeeiiiioooauuuaeiou") == 5
    assert sol.longestBeautifulSubstring("a") == 0

if __name__ == '__main__':
    test()
