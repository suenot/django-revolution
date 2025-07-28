import json
import os
from django.core.management.base import BaseCommand
from apps.trading_signals.models import Channel


class Command(BaseCommand):
    help = 'Seed channels from source_channels.json file'

    def add_arguments(self, parser):
        parser.add_argument(
            '--file',
            type=str,
            default='/Users/suenot/projects/django-revolution-3/source_channels.json',
            help='Path to source_channels.json file'
        )
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing channels before seeding'
        )

    def handle(self, *args, **options):
        file_path = options['file']
        clear_existing = options['clear']

        if not os.path.exists(file_path):
            self.stdout.write(
                self.style.ERROR(f'File not found: {file_path}')
            )
            return

        # Clear existing channels if requested
        if clear_existing:
            Channel.objects.all().delete()
            self.stdout.write(
                self.style.SUCCESS('Cleared existing channels')
            )

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)

            channels_data = data.get('channels', {})
            created_count = 0
            updated_count = 0

            for channel_name, channel_info in channels_data.items():
                telegram_id = str(channel_info.get('id', ''))
                
                if not telegram_id:
                    self.stdout.write(
                        self.style.WARNING(f'Skipping channel "{channel_name}" - no telegram_id')
                    )
                    continue

                # Try to get existing channel or create new one
                channel, created = Channel.objects.get_or_create(
                    telegram_id=telegram_id,
                    defaults={
                        'name': channel_name,
                        'forward_type': channel_info.get('forward_type', 'custom'),
                        'signal_fn': channel_info.get('signal_fn', 'signal_analyzer'),
                        'signals_only': channel_info.get('signals_only', True),
                        'leverage': channel_info.get('leverage', 1),
                        'portfolio_percent': channel_info.get('portfolio_percent', 0.25),
                        'open_mode': channel_info.get('open_mode', 'default'),
                        'move_stop_to_breakeven': channel_info.get('move_stop_to_breakeven', True),
                        'allow_signals_without_sl_tp': channel_info.get('allow_signals_without_sl_tp', True),
                        'max_profit_percent': channel_info.get('max_profit_percent', 0.0),
                        'review': channel_info.get('review', True),
                        'position_lifetime': channel_info.get('position_lifetime', '0s'),
                        'target_chat_id': channel_info.get('target_chat_id', -4984770976),
                        'wins': channel_info.get('wins', 0),
                        'fails': channel_info.get('fails', 0),
                        'wins_ratio': channel_info.get('wins_ratio', 0.0),
                    }
                )

                if created:
                    created_count += 1
                    self.stdout.write(
                        self.style.SUCCESS(f'Created channel: {channel_name} (ID: {telegram_id})')
                    )
                else:
                    # Update existing channel with all fields
                    updated = False
                    if channel.name != channel_name:
                        channel.name = channel_name
                        updated = True
                    
                    # Update all other fields
                    fields_to_update = [
                        'forward_type', 'signal_fn', 'signals_only', 'leverage',
                        'portfolio_percent', 'open_mode', 'move_stop_to_breakeven',
                        'allow_signals_without_sl_tp', 'max_profit_percent', 'review',
                        'position_lifetime', 'target_chat_id', 'wins', 'fails', 'wins_ratio'
                    ]
                    
                    for field in fields_to_update:
                        new_value = channel_info.get(field)
                        if new_value is not None and getattr(channel, field) != new_value:
                            setattr(channel, field, new_value)
                            updated = True
                    
                    if updated:
                        channel.save()
                        updated_count += 1
                        self.stdout.write(
                            self.style.WARNING(f'Updated channel: {channel_name} (ID: {telegram_id})')
                        )

            self.stdout.write(
                self.style.SUCCESS(
                    f'Seeding completed! Created: {created_count}, Updated: {updated_count}, '
                    f'Total channels: {Channel.objects.count()}'
                )
            )

        except json.JSONDecodeError as e:
            self.stdout.write(
                self.style.ERROR(f'Invalid JSON file: {e}')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error processing file: {e}')
            ) 