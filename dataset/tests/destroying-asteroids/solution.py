class Solution:
    def asteroidsDestroyed(self, mass: int, asteroids: list[int]) -> bool:
        asteroids.sort()
        curr_mass = mass

        for a in asteroids:
            if curr_mass < a:
                return False
            curr_mass += a

        return True
