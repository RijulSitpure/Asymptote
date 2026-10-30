class Solution:
    def nextBeautifulNumber(self, n: int) -> int:
        def is_balanced(x: int) -> bool:
            s = str(x)
            for ch in set(s):
                d = int(ch)
                if s.count(ch) != d:
                    return False
            return True

        curr = n + 1
        while not is_balanced(curr):
            curr += 1
        return curr
