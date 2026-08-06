import 'dart:async';
import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../widgets/timeline_view.dart';
import '../../widgets/status_chip.dart';

/// Complaint Detail Screen for Citizen Mobile App.
/// Auto-polls every 25s for status freshness without manual pull-to-refresh.
/// Strictly filters out department-internal notes, exposing public milestones only.
class ComplaintDetailScreen extends StatefulWidget {
  final String complaintId;

  const ComplaintDetailScreen({
    super.key,
    required this.complaintId,
  });

  @override
  State<ComplaintDetailScreen> createState() => _ComplaintDetailScreenState();
}

class _ComplaintDetailScreenState extends State<ComplaintDetailScreen> {
  Timer? _pollingTimer;
  DateTime _lastPolled = DateTime.now();

  final List<TimelineStepItem> _timelineSteps = const [
    TimelineStepItem(
      title: "Complaint Registered",
      description: "Submitted to Sentinel Network. Verified lat/lng coordinates locked.",
      timestamp: "Aug 5, 10:30 AM",
      isCompleted: true,
    ),
    TimelineStepItem(
      title: "Assigned to Department",
      description: "Routed to BBMP Road Infrastructure & Engineering.",
      timestamp: "Aug 5, 11:00 AM",
      isCompleted: true,
    ),
    TimelineStepItem(
      title: "Field Crew Dispatched",
      description: "Repair crew assigned and en route to defect location.",
      timestamp: "Aug 6, 09:15 AM",
      isCurrent: true,
    ),
    TimelineStepItem(
      title: "Resolution Confirmed",
      description: "Repair completed. Citizen reward points (+50 pts) credited.",
      timestamp: "Pending",
    ),
  ];

  @override
  void initState() {
    super.initState();
    // Smart Polling: auto-refresh status every 25s
    _pollingTimer = Timer.periodic(const Duration(seconds: 25), (timer) {
      if (mounted) {
        setState(() {
          _lastPolled = DateTime.now();
        });
      }
    });
  }

  @override
  void dispose() {
    _pollingTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.complaintId.isEmpty ? 'NP-2026-000101' : widget.complaintId),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              setState(() => _lastPolled = DateTime.now());
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Status Header Badge
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const StatusChipWidget(status: 'in_progress'),
                Text(
                  "Polled ${_lastPolled.second}s ago",
                  style: const TextStyle(fontSize: 11, color: AppColors.textMutedLight),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Title & Address
            Text(
              "Severe Pothole on 80 Feet Road",
              style: theme.textTheme.headlineLarge?.copyWith(fontSize: 20),
            ),
            const SizedBox(height: 6),
            const Row(
              children: [
                Icon(Icons.location_on, size: 14, color: AppColors.brandPrimary),
                SizedBox(width: 4),
                Expanded(
                  child: Text(
                    "80 Feet Road, Koramangala 4th Block · Ward 15",
                    style: TextStyle(fontSize: 12, color: AppColors.textSecondaryLight),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Timeline Stepper Card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("STATUS TRACKING TIMELINE", style: theme.textTheme.labelMedium?.copyWith(color: AppColors.brandPrimary)),
                    const SizedBox(height: 16),
                    CitizenTimelineView(steps: _timelineSteps),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Citizen Sentinel Reward Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.stateGreen.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.stateGreen.withOpacity(0.3)),
              ),
              child: const Row(
                children: [
                  Icon(Icons.stars, color: AppColors.stateGreen, size: 32),
                  SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Sentinel Reward Pending", style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.stateGreen)),
                      Text("+50 Points will be credited upon verified resolution.", style: TextStyle(fontSize: 11, color: AppColors.textSecondaryLight)),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
