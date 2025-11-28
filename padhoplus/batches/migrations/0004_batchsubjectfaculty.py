# Generated migration for BatchSubjectFaculty model

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('batches', '0003_language_alter_batch_options_remove_batch_faculty_and_more'),
        ('users', '0003_remove_faculty_subjects_faculty_subjects'),
    ]

    operations = [
        migrations.CreateModel(
            name='BatchSubjectFaculty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='batch_subject_faculties', to='batches.batch')),
                ('faculty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.faculty')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='batches.subject')),
            ],
            options={
                'db_table': 'batch_subject_faculties',
            },
        ),
        migrations.AlterUniqueTogether(
            name='batchsubjectfaculty',
            unique_together={('batch', 'subject', 'faculty')},
        ),
    ]
