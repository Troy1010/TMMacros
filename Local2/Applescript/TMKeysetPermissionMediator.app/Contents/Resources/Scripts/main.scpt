FasdUAS 1.101.10   ��   ��    k             l     ��  ��    @ :use AppleScript version "2.4" -- Yosemite (10.10) or later     � 	 	 t u s e   A p p l e S c r i p t   v e r s i o n   " 2 . 4 "   - -   Y o s e m i t e   ( 1 0 . 1 0 )   o r   l a t e r   
  
 l     ��  ��    � � use framework "Foundation" # A migration is required in order for this script to work with "Foundation", but it's not necessary atm. See more details here: https://latenightsw.com/adding-applescriptobjc-to-existing-scripts/     �  �   u s e   f r a m e w o r k   " F o u n d a t i o n "   #   A   m i g r a t i o n   i s   r e q u i r e d   i n   o r d e r   f o r   t h i s   s c r i p t   t o   w o r k   w i t h   " F o u n d a t i o n " ,   b u t   i t ' s   n o t   n e c e s s a r y   a t m .   S e e   m o r e   d e t a i l s   h e r e :   h t t p s : / / l a t e n i g h t s w . c o m / a d d i n g - a p p l e s c r i p t o b j c - t o - e x i s t i n g - s c r i p t s /      l     ��  ��     use scripting additions     �   . u s e   s c r i p t i n g   a d d i t i o n s      l     ��������  ��  ��        l     ��������  ��  ��        l     ��  ��    E ? This allows us to only give permissions once for all keybinds.     �   ~   T h i s   a l l o w s   u s   t o   o n l y   g i v e   p e r m i s s i o n s   o n c e   f o r   a l l   k e y b i n d s .      l     ��   ��    i c In order for permissions to be given, this script needs to be an Applet (it needs to end in .app).      � ! ! �   I n   o r d e r   f o r   p e r m i s s i o n s   t o   b e   g i v e n ,   t h i s   s c r i p t   n e e d s   t o   b e   a n   A p p l e t   ( i t   n e e d s   t o   e n d   i n   . a p p ) .   " # " l     �� $ %��   $ [ U In order to do that, you must use File -> Export -> File Format: Application -> Save    % � & & �   I n   o r d e r   t o   d o   t h a t ,   y o u   m u s t   u s e   F i l e   - >   E x p o r t   - >   F i l e   F o r m a t :   A p p l i c a t i o n   - >   S a v e #  ' ( ' i      ) * ) I     �� +��
�� .aevtoappnull  �   � **** + o      ���� 0 argv  ��   * Q     ' , - . , k     / /  0 1 0 r     2 3 2 I   �� 4��
�� .sysoloadscpt        file 4 c    	 5 6 5 4    �� 7
�� 
psxf 7 m     8 8 � 9 9 � / U s e r s / g z m y r l / S c r i p t s / T M M a c r o s / L o c a l 2 / A p p l e s c r i p t / T M C o m m o n A p p l e S c r i p t . s c p t 6 m    ��
�� 
alis��   3 o      ���� 0 tm TM 1  : ; : r     < = < n    > ? > I    �������� $0 geteasylauncharg getEasyLaunchArg��  ��   ? o    ���� 0 tm TM = o      ���� 0 _key   ;  @�� @ I    �� A���� 0 	launchkey 	LaunchKey A  B�� B o    ���� 0 _key  ��  ��  ��   - R      �� C��
�� .ascrerr ****      � **** C o      ���� 0 errormessage errorMessage��   . l  & &�� D E��   D &   no key was given, so just wait.    E � F F @   n o   k e y   w a s   g i v e n ,   s o   j u s t   w a i t . (  G H G l     ��������  ��  ��   H  I�� I i     J K J I      �� L���� 0 	launchkey 	LaunchKey L  M�� M o      ���� 0 arg1  ��  ��   K k      N N  O P O r      Q R Q I    
�� S��
�� .sysoloadscpt        file S c      T U T 4     �� V
�� 
psxf V m     W W � X X ~ / U s e r s / g z m y r l / S c r i p t s / T M M a c r o s / L o c a l 2 / A p p l e s c r i p t / T M K e y s e t . s c p t U m    ��
�� 
alis��   R o      ���� 0 keyset Keyset P  Y Z Y l   �� [ \��   [ ] Wset Keyset to load script POSIX file "/Users/gzmyrl/Applescript/TMKeyset.scpt" as alias    \ � ] ] � s e t   K e y s e t   t o   l o a d   s c r i p t   P O S I X   f i l e   " / U s e r s / g z m y r l / A p p l e s c r i p t / T M K e y s e t . s c p t "   a s   a l i a s Z  ^ _ ^ r     ` a ` b     b c b b     d e d m     f f � g g D o n   r u n   a r g v 2  	 ( i t e m   1   o f   a r g v 2 ) ' s   e o    ���� 0 arg1   c m     h h � i i  ( )  	 	 e n d a o      ���� 0 scpt   _  j�� j I   �� k l
�� .sysodsct****        scpt k o    ���� 0 scpt   l �� m��
�� 
plst m J     n n  o�� o o    ���� 0 keyset Keyset��  ��  ��  ��       �� p q r��   p ����
�� .aevtoappnull  �   � ****�� 0 	launchkey 	LaunchKey q �� *���� s t��
�� .aevtoappnull  �   � ****�� 0 argv  ��   s ������ 0 argv  �� 0 errormessage errorMessage t 
�� 8����������������
�� 
psxf
�� 
alis
�� .sysoloadscpt        file�� 0 tm TM�� $0 geteasylauncharg getEasyLaunchArg�� 0 _key  �� 0 	launchkey 	LaunchKey�� 0 errormessage errorMessage��  �� (  )��/�&j E�O�j+ E�O*�k+ W X  	h r �� K���� u v���� 0 	launchkey 	LaunchKey�� �� w��  w  ���� 0 arg1  ��   u �������� 0 arg1  �� 0 keyset Keyset�� 0 scpt   v �� W���� f h����
�� 
psxf
�� 
alis
�� .sysoloadscpt        file
�� 
plst
�� .sysodsct****        scpt�� )��/�&j E�O�%�%E�O��kvl ascr  ��ޭ