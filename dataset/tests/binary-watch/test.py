import sys
from typing import List

class Solution:
    def readBinaryWatch(self, turnedOn: int) -> List[str]:
        res = []
        for h in range(12):
            for m in range(60):
                if (bin(h).count("1") + bin(m).count("1")) == turnedOn:
                    res.append(f"{h}:{m:02d}")
        return res

def test():
    sol = Solution()
    res1 = sorted(sol.readBinaryWatch(1))
    assert "0:01" in res1, "test 1 failed"
    assert "1:00" in res1, "test 2 failed"
    assert sol.readBinaryWatch(9) == [], "test 3 failed"
    print("✓ binary-watch passed")

if __name__ == "__main__":
    test()
