from typing import List

class Solution:
    def reorderLogFiles(self, logs: List[str]) -> List[str]:
        def get_key(log: str):
            ident, rest = log.split(" ", 1)
            if rest[0].isdigit():
                return (1,)
            return (0, rest, ident)
        return sorted(logs, key=get_key)

def test():
    sol = Solution()
    l1 = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
    expected1 = ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
    assert sol.reorderLogFiles(l1) == expected1, "test 1 failed"
    l2 = ["a1 9 2 3 1","g1 act car","zo4 4 7","ab1 off key dog","a8 act zoo"]
    expected2 = ["g1 act car","a8 act zoo","ab1 off key dog","a1 9 2 3 1","zo4 4 7"]
    assert sol.reorderLogFiles(l2) == expected2, "test 2 failed"
    print("✓ reorder-data-in-log-files passed")

if __name__ == "__main__":
    test()
