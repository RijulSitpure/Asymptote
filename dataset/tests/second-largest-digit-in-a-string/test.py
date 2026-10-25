class Solution:
    def secondHighest(self, s: str) -> int:
        first, second = -1, -1
        for c in s:
            if c.isdigit():
                d = int(c)
                if d > first:
                    second = first
                    first = d
                elif first > d > second:
                    second = d
        return second

def test():
    sol = Solution()
    assert sol.secondHighest("dfa12321afd") == 2
    assert sol.secondHighest("abc1111") == -1

    print("✓ second-largest-digit-in-a-string passed")

if __name__ == '__main__':
    test()
