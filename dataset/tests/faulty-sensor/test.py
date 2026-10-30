class Solution:
    def badSensor(self, sensor1: list[int], sensor2: list[int]) -> int:
        n = len(sensor1)
        i = 0
        while i < n and sensor1[i] == sensor2[i]:
            i += 1
        if i >= n - 1:
            return -1
        s1_drop = sensor1[i:-1] == sensor2[i+1:]
        s2_drop = sensor2[i:-1] == sensor1[i+1:]
        if s1_drop and s2_drop:
            return -1
        if s1_drop:
            return 1
        if s2_drop:
            return 2
        return -1

def test_faulty_sensor():
    sol = Solution()
    assert sol.badSensor([2, 3, 4, 5], [2, 3, 5, 4]) == -1
    assert sol.badSensor([2, 3, 2, 2, 3, 2], [2, 3, 2, 3, 2, 7]) == 2
    assert sol.badSensor([2, 3, 2, 3, 2, 2], [2, 3, 2, 2, 2, 7]) == 2

