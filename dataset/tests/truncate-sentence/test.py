class Solution:
    def truncateSentence(self, s: str, k: int) -> str:
        return ' '.join(s.split()[:k])

def test():
    sol = Solution()
    assert sol.truncateSentence("Hello how are you Contestant", 4) == "Hello how are you"
    assert sol.truncateSentence("What is the solution to this problem", 4) == "What is the solution"
    assert sol.truncateSentence("chopper is not a tanuki", 5) == "chopper is not a tanuki"

if __name__ == '__main__':
    test()
