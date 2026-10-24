from typing import List

class Solution:
    def movesToStamp(self, stamp: str, target: str) -> List[int]:
        s_len, t_len = len(stamp), len(target)
        s_arr = list(stamp)
        t_arr = list(target)
        res = []
        changed = True
        total_stamped = 0
        def can_stamp(idx: int) -> int:
            new_wildcards = 0
            for i in range(s_len):
                if t_arr[idx + i] == "?":
                    continue
                if t_arr[idx + i] != s_arr[i]:
                    return 0
                new_wildcards += 1
            return new_wildcards
        while total_stamped < t_len and changed:
            changed = False
            for i in range(t_len - s_len + 1):
                cnt = can_stamp(i)
                if cnt > 0:
                    res.append(i)
                    total_stamped += cnt
                    changed = True
                    for j in range(s_len):
                        t_arr[i + j] = "?"
                    if total_stamped == t_len:
                        break
        return res[::-1] if total_stamped == t_len else []

def verify_stamps(stamp, target, moves):
    s_len = len(stamp)
    res = ["?"] * len(target)
    for m in moves:
        for i in range(s_len):
            res[m + i] = stamp[i]
    return "".join(res) == target

def test():
    sol = Solution()
    m1 = sol.movesToStamp("abc", "ababc")
    assert verify_stamps("abc", "ababc", m1), "test 1 failed"
    m2 = sol.movesToStamp("abca", "aabcaca")
    assert verify_stamps("abca", "aabcaca", m2), "test 2 failed"
    print("✓ stamping-the-sequence passed")

if __name__ == "__main__":
    test()
