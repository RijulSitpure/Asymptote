from typing import List

class Solution:
    def expressiveWords(self, s: str, words: List[str]) -> int:
        def get_runs(text: str):
            runs = []
            i = 0
            while i < len(text):
                j = i
                while j < len(text) and text[j] == text[i]:
                    j += 1
                runs.append((text[i], j - i))
                i = j
            return runs

        s_runs = get_runs(s)
        ans = 0
        for word in words:
            w_runs = get_runs(word)
            if len(w_runs) != len(s_runs):
                continue
            valid = True
            for (c1, len1), (c2, len2) in zip(s_runs, w_runs):
                if c1 != c2 or len1 < len2 or (len1 > len2 and len1 < 3):
                    valid = False
                    break
            if valid:
                ans += 1
        return ans

def test():
    sol = Solution()
    assert sol.expressiveWords("heeellooo", ["hello", "hi", "helo"]) == 1, "test 1 failed"
    assert sol.expressiveWords("zzzzzyyyyy", ["zzyy", "zy", "zyy"]) == 3, "test 2 failed"
    print("✓ expressive-words passed")

if __name__ == "__main__":
    test()
