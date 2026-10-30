class Solution:
    def countTime(self, time: str) -> int:
        ans = 0
        for h in range(24):
            for m in range(60):
                formatted = f"{h:02d}:{m:02d}"
                match = True
                for c1, c2 in zip(time, formatted):
                    if c1 != '?' and c1 != c2:
                        match = False
                        break
                if match:
                    ans += 1
        return ans
