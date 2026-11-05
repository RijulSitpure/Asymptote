class Solution:
    def maxStudentsOnBench(self, students: list[list[int]]) -> int:
        bench_map = {}
        for student_id, bench_id in students:
            if bench_id not in bench_map:
                bench_map[bench_id] = set()
            bench_map[bench_id].add(student_id)
            
        max_students = 0
        for s_set in bench_map.values():
            if len(s_set) > max_students:
                max_students = len(s_set)
        return max_students
