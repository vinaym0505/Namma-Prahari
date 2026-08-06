class CategoryEntity {
  final String id;
  final String name;
  final String departmentId;
  final String baseSeverity;
  final String icon;

  const CategoryEntity({
    required this.id,
    required this.name,
    required this.departmentId,
    required this.baseSeverity,
    required this.icon,
  });
}

const List<CategoryEntity> SEEDED_CATEGORIES = [
  CategoryEntity(
    id: 'c1111111-1111-1111-1111-111111111111',
    name: 'Road Potholes & Infrastructure',
    departmentId: '11111111-1111-1111-1111-111111111111',
    baseSeverity: 'High',
    icon: 'construction',
  ),
  CategoryEntity(
    id: 'c2222222-2222-2222-2222-222222222222',
    name: 'Garbage Dump & Sanitation',
    departmentId: '22222222-2222-2222-2222-222222222222',
    baseSeverity: 'High',
    icon: 'delete',
  ),
  CategoryEntity(
    id: 'c3333333-3333-3333-3333-333333333333',
    name: 'Water Supply Leak & Sewerage',
    departmentId: '33333333-3333-3333-3333-333333333333',
    baseSeverity: 'Medium',
    icon: 'water_drop',
  ),
  CategoryEntity(
    id: 'c4444444-4444-4444-4444-444444444444',
    name: 'Streetlight Grid & Electrical',
    departmentId: '44444444-4444-4444-4444-444444444444',
    baseSeverity: 'Medium',
    icon: 'bolt',
  ),
  CategoryEntity(
    id: 'c5555555-5555-5555-5555-555555555555',
    name: 'Drainage & Stormwater Overflow',
    departmentId: '11111111-1111-1111-1111-111111111111',
    baseSeverity: 'High',
    icon: 'plumbing',
  ),
];
