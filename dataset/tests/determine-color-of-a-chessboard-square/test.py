class Solution:
    def squareIsWhite(self, coordinates: str) -> bool:
        col = ord(coordinates[0]) - ord('a')
        row = int(coordinates[1])
        return (col + row) % 2 == 0

def test():
    sol = Solution()
    assert sol.squareIsWhite("a1") is False
    assert sol.squareIsWhite("h3") is True
    assert sol.squareIsWhite("c7") is False

if __name__ == '__main__':
    test()
