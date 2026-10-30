class Allocator:
    def __init__(self, n: int):
        self.mem = [0] * n
        self.n = n

    def allocate(self, size: int, mID: int) -> int:
        free_count = 0
        start_idx = -1
        for i in range(self.n):
            if self.mem[i] == 0:
                if free_count == 0:
                    start_idx = i
                free_count += 1
                if free_count == size:
                    for j in range(start_idx, start_idx + size):
                        self.mem[j] = mID
                    return start_idx
            else:
                free_count = 0
                start_idx = -1
        return -1

    def freeMemory(self, mID: int) -> int:
        freed = 0
        for i in range(self.n):
            if self.mem[i] == mID:
                self.mem[i] = 0
                freed += 1
        return freed
