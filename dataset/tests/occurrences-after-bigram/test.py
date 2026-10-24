from typing import List

class Solution:
    def findOcurrences(self, text: str, first: str, second: str) -> List[str]:
        words = text.split()
        res = []
        for i in range(len(words) - 2):
            if words[i] == first and words[i + 1] == second:
                res.append(words[i + 2])
        return res

def test():
    sol = Solution()
    t1 = "alice is a good girl she is a good student"
    assert sol.findOcurrences(t1, "a", "good") == ["girl", "student"], "test 1 failed"
    t2 = "we will we will rock you"
    assert sol.findOcurrences(t2, "we", "will") == ["we", "rock"], "test 2 failed"
    print("✓ occurrences-after-bigram passed")

if __name__ == "__main__":
    test()
