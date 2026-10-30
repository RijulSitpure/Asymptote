class LockingTree:
    def __init__(self, parent: list[int]):
        self.parent = parent
        self.n = len(parent)
        self.locked = [0] * self.n
        self.children = [[] for _ in range(self.n)]
        for i in range(1, self.n):
            self.children[parent[i]].append(i)

    def lock(self, num: int, user: int) -> bool:
        if self.locked[num] == 0:
            self.locked[num] = user
            return True
        return False

    def unlock(self, num: int, user: int) -> bool:
        if self.locked[num] == user:
            self.locked[num] = 0
            return True
        return False

    def upgrade(self, num: int, user: int) -> bool:
        if self.locked[num] != 0:
            return False
        curr = self.parent[num]
        while curr != -1:
            if self.locked[curr] != 0:
                return False
            curr = self.parent[curr]
        locked_descendants = []
        def dfs(u):
            if self.locked[u] != 0:
                locked_descendants.append(u)
            for v in self.children[u]:
                dfs(v)
        for child in self.children[num]:
            dfs(child)
        if not locked_descendants:
            return False
        self.locked[num] = user
        for u in locked_descendants:
            self.locked[u] = 0
        return True
