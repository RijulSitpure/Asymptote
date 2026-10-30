class Solution:
    def areNumbersAscending(self, s: str) -> bool:
        prev = -1
        for token in s.split():
            if token.isdigit():
                val = int(token)
                if val <= prev:
                    return False
                prev = val
        return True
