class Solution:
    def maximumTime(self, time: str) -> str:
        t = list(time)
        if t[0] == '?':
            t[0] = '2' if t[1] in '?0123' else '1'
        if t[1] == '?':
            t[1] = '3' if t[0] == '2' else '9'
        if t[3] == '?':
            t[3] = '5'
        if t[4] == '?':
            t[4] = '9'
        return "".join(t)

def test():
    sol = Solution()
    assert sol.maximumTime("2?:?0") == "23:50"
    assert sol.maximumTime("0?:3?") == "09:39"
    assert sol.maximumTime("1?:22") == "19:22"

    print("✓ latest-time-by-replacing-hidden-digits passed")

if __name__ == '__main__':
    test()
