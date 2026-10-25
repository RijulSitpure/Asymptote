from collections import defaultdict

class Solution:
    def alertNames(self, keyName: list[str], keyTime: list[str]) -> list[str]:
        events = defaultdict(list)
        for name, t in zip(keyName, keyTime):
            h, m = map(int, t.split(":"))
            events[name].append(h * 60 + m)
        ans = []
        for name in events:
            times = sorted(events[name])
            for i in range(len(times) - 2):
                if times[i + 2] - times[i] <= 60:
                    ans.append(name)
                    break
        return sorted(ans)

def test():
    sol = Solution()
    assert sol.alertNames(["daniel","daniel","daniel","luis","luis","luis","luis"], ["10:00","10:40","11:00","09:00","11:00","13:00","15:00"]) == ["daniel"]
    assert sol.alertNames(["alice","alice","alice","bob","bob","bob","bob"], ["12:01","12:00","18:00","21:00","21:20","21:30","23:00"]) == ["bob"]
    assert sol.alertNames(["john","john","john"], ["23:58","23:59","00:01"]) == []

    print("✓ alert-using-same-key-card-three-or-more-times-in-a-one-hour-period passed")

if __name__ == '__main__':
    test()
