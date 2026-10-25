class Solution:
    def checkIfPangram(self, sentence: str) -> bool:
        return len(set(sentence)) == 26

def test():
    sol = Solution()
    assert sol.checkIfPangram("thequickbrownfoxjumpsoverthelazydog") is True
    assert sol.checkIfPangram("leetcode") is False

if __name__ == '__main__':
    test()
