from typing import List

class Solution:
    def generateSchedule(self, tasks: List[str], cooldown: int) -> int:
        last_pos = {}
        curr_time = 0
        for task in tasks:
            if task in last_pos:
                curr_time = max(curr_time + 1, last_pos[task] + cooldown + 1)
            else:
                curr_time += 1
            last_pos[task] = curr_time
        return curr_time

def run_tests():
    sol = Solution()
    assert sol.generateSchedule(["A", "A", "B"], 2) == 5 # t=1: A, t=2: idle, t=3: idle, t=4: A, t=5: B -> 5
    assert sol.generateSchedule(["A", "B", "C"], 2) == 3
    assert sol.generateSchedule(["A", "B", "A"], 1) == 3
    print("All tests passed for 3680.")

if __name__ == "__main__":
    run_tests()
