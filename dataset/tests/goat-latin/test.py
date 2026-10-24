class Solution:
    def toGoatLatin(self, sentence: str) -> str:
        vowels = set("aeiouAEIOU")
        words = sentence.split()
        ans = []
        for i, w in enumerate(words, 1):
            if w[0] in vowels:
                transformed = w + "ma"
            else:
                transformed = w[1:] + w[0] + "ma"
            transformed += "a" * i
            ans.append(transformed)
        return " ".join(ans)

def test():
    sol = Solution()
    s1 = "I speak Goat Latin"
    exp1 = "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"
    assert sol.toGoatLatin(s1) == exp1, "test 1 failed"
    print("✓ goat-latin passed")

if __name__ == "__main__":
    test()
