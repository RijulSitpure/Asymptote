class Solution:
    def reorderSpaces(self, text: str) -> str:
        total_spaces = text.count(" ")
        words = text.split()
        n = len(words)
        if n == 1:
            return words[0] + " " * total_spaces
        gap = total_spaces // (n - 1)
        rem = total_spaces % (n - 1)
        return (" " * gap).join(words) + " " * rem

def test():
    sol = Solution()
    assert sol.reorderSpaces("  this   is  a sentence ") == "this   is   a   sentence"
    assert sol.reorderSpaces(" practice   makes   perfect") == "practice   makes   perfect "
    assert sol.reorderSpaces("hello   world") == "hello   world"
    assert sol.reorderSpaces("  walks  udp package   into  bar a") == "walks  udp  package  into  bar  a "
    assert sol.reorderSpaces("a") == "a"

    print("✓ rearrange-spaces-between-words passed")

if __name__ == '__main__':
    test()
