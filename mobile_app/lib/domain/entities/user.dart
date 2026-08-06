class AppUser {
  final String id;
  final String name;
  final String email;
  final String? avatarUrl;
  final String role; // 'citizen', 'department_staff', 'department_head', 'admin', 'super_admin'
  final String? departmentId;
  final int rewardPoints;
  final DateTime createdAt;

  const AppUser({
    required this.id,
    required this.name,
    required this.email,
    this.avatarUrl,
    this.role = 'citizen',
    this.departmentId,
    this.rewardPoints = 0,
    required this.createdAt,
  });

  bool get isCitizen => role == 'citizen';
  bool get isAdmin => role == 'admin' || role == 'super_admin';
  bool get isDeptStaff => role == 'department_staff' || role == 'department_head';
}
